// Utilitaires de monitoring et maintenance du site

export interface HealthCheck {
  service: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export class SiteMonitor {
  private static checks: HealthCheck[] = [];

  // Vérification de la connectivité Supabase
  static async checkSupabaseConnection(): Promise<HealthCheck> {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.from('staff').select('count').limit(1);
      
      if (error) throw error;
      
      return {
        service: 'Supabase Connection',
        status: 'healthy',
        message: 'Base de données accessible',
        timestamp: new Date()
      };
    } catch (error: any) {
      return {
        service: 'Supabase Connection',
        status: 'error',
        message: `Erreur DB: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  // Vérification des images critiques
  static async checkCriticalAssets(): Promise<HealthCheck> {
    try {
      const criticalImages = [
        '/src/assets/heavent-logo.png',
        '/src/assets/hero-staff.jpg'
      ];

      const checks = await Promise.all(
        criticalImages.map(async (src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          });
        })
      );

      const allLoaded = checks.every(Boolean);
      
      return {
        service: 'Critical Assets',
        status: allLoaded ? 'healthy' : 'warning',
        message: allLoaded ? 'Toutes les images critiques sont accessibles' : 'Certaines images ne se chargent pas',
        timestamp: new Date()
      };
    } catch (error: any) {
      return {
        service: 'Critical Assets',
        status: 'error',
        message: `Erreur assets: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  // Vérification des edge functions
  static async checkEdgeFunctions(): Promise<HealthCheck> {
    try {
      const testData = {
        type: 'test',
        data: { test: true }
      };

      const response = await fetch('https://dlxaqkaivjkxtqyxswls.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
      });

      // Un test qui échoue gracieusement est OK
      return {
        service: 'Edge Functions',
        status: response.status < 500 ? 'healthy' : 'warning',
        message: `Service email accessible (${response.status})`,
        timestamp: new Date()
      };
    } catch (error: any) {
      return {
        service: 'Edge Functions',
        status: 'error',
        message: `Edge functions inaccessibles: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  // Exécuter tous les checks
  static async runHealthChecks(): Promise<HealthCheck[]> {
    console.log('🔍 Exécution des vérifications de santé du site...');
    
    const checks = await Promise.all([
      this.checkSupabaseConnection(),
      this.checkCriticalAssets(),
      this.checkEdgeFunctions()
    ]);

    this.checks = checks;
    
    const healthyCount = checks.filter(c => c.status === 'healthy').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    const errorCount = checks.filter(c => c.status === 'error').length;
    
    console.log(`✅ ${healthyCount} services OK | ⚠️ ${warningCount} avertissements | ❌ ${errorCount} erreurs`);
    
    return checks;
  }

  // Obtenir le statut général
  static getOverallStatus(): 'healthy' | 'warning' | 'error' {
    if (this.checks.length === 0) return 'warning';
    
    const hasErrors = this.checks.some(c => c.status === 'error');
    const hasWarnings = this.checks.some(c => c.status === 'warning');
    
    if (hasErrors) return 'error';
    if (hasWarnings) return 'warning';
    return 'healthy';
  }

  // Obtenir les derniers checks
  static getLastChecks(): HealthCheck[] {
    return this.checks;
  }
}

// Auto-monitoring en développement
if (import.meta.env.DEV) {
  // Vérification au démarrage après 3 secondes
  setTimeout(() => {
    SiteMonitor.runHealthChecks();
  }, 3000);

  // Vérification périodique toutes les 10 minutes
  setInterval(() => {
    SiteMonitor.runHealthChecks();
  }, 10 * 60 * 1000);
}