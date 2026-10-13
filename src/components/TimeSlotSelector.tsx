import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Sun, CloudSun, Moon, X, Plus, Trash2, Clock } from "lucide-react";

interface TimeSlot {
  id: string;
  creneau: 'matin' | 'apres_midi' | 'soir';
  disponible: boolean;
  notes?: string;
}

interface CustomTimeSlot {
  id?: string;
  heure_debut: string;
  heure_fin: string;
  disponible: boolean;
  notes?: string;
}

interface TimeSlotSelectorProps {
  selectedDate: Date;
  selectedDates?: Date[];
  timeSlots: TimeSlot[];
  customTimeSlots?: CustomTimeSlot[];
  onUpdateSlot: (creneau: 'matin' | 'apres_midi' | 'soir', disponible: boolean, notes?: string) => Promise<void>;
  onUpdateCustomSlot: (slot: CustomTimeSlot, isNew?: boolean) => void;
  onDeleteCustomSlot: (slotId: string) => void;
  onClose: () => void;
}

const CRENEAUX = [
  { id: 'matin', label: 'Matin', icon: Sun, time: '8h - 12h', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { id: 'apres_midi', label: 'Après-midi', icon: CloudSun, time: '12h - 18h', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'soir', label: 'Soir', icon: Moon, time: '18h - 22h', color: 'bg-blue-100 text-blue-800 border-blue-300' }
] as const;

export function TimeSlotSelector({ 
  selectedDate, 
  selectedDates = [], 
  timeSlots, 
  customTimeSlots = [], 
  onUpdateSlot, 
  onUpdateCustomSlot,
  onDeleteCustomSlot,
  onClose 
}: TimeSlotSelectorProps) {
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [newSlot, setNewSlot] = useState<CustomTimeSlot>({
    heure_debut: '',
    heure_fin: '',
    disponible: true,
    notes: ''
  });
  const [showNewSlotForm, setShowNewSlotForm] = useState(false);

  const getSlotForCreneau = (creneau: string) => {
    return timeSlots.find(slot => slot.creneau === creneau);
  };

  const handleSlotToggle = async (creneau: 'matin' | 'apres_midi' | 'soir') => {
    console.log('handleSlotToggle appelé avec:', creneau);
    const currentSlot = getSlotForCreneau(creneau);
    console.log('currentSlot:', currentSlot);
    const newStatus = !currentSlot?.disponible;
    console.log('newStatus:', newStatus);
    console.log('Appel de onUpdateSlot avec:', { creneau, newStatus, notes: notes[creneau] || currentSlot?.notes || '' });
    await onUpdateSlot(creneau, newStatus, notes[creneau] || currentSlot?.notes || '');
  };

  const handleNotesChange = (creneau: string, value: string) => {
    setNotes(prev => ({ ...prev, [creneau]: value }));
  };

  const handleAddCustomSlot = () => {
    if (newSlot.heure_debut && newSlot.heure_fin) {
      onUpdateCustomSlot(newSlot, true);
      setNewSlot({
        heure_debut: '',
        heure_fin: '',
        disponible: true,
        notes: ''
      });
      setShowNewSlotForm(false);
    }
  };

  const handleCustomSlotChange = (slot: CustomTimeSlot, field: keyof CustomTimeSlot, value: any) => {
    const updatedSlot = { ...slot, [field]: value };
    onUpdateCustomSlot(updatedSlot);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">
            {selectedDates.length > 1 
              ? `Disponibilités pour ${selectedDates.length} dates` 
              : `Disponibilités du ${format(selectedDate, "dd MMMM yyyy", { locale: fr })}`
            }
          </CardTitle>
          {selectedDates.length > 1 && (
            <p className="text-sm text-muted-foreground mt-1">
              Les créneaux seront appliqués à toutes les dates sélectionnées
            </p>
          )}
        </div>
        <Button variant="ghost" size="sm" className="pointer-events-auto" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Créneaux prédéfinis */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground">Créneaux prédéfinis</h3>
          {CRENEAUX.map((creneau) => {
            const slot = getSlotForCreneau(creneau.id);
            const isAvailable = slot?.disponible || false;
            const Icon = creneau.icon;
            
            return (
              <div key={creneau.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{creneau.label}</h4>
                      <p className="text-sm text-muted-foreground">{creneau.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={isAvailable ? "default" : "secondary"}
                      className={isAvailable ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}
                    >
                      {isAvailable ? "Disponible" : "Indisponible"}
                    </Badge>
                    <Button
                      variant={isAvailable ? "destructive" : "default"}
                      size="sm"
                      className="pointer-events-auto"
                      onClick={() => {
                        console.log('Button cliqué pour:', creneau.id);
                        handleSlotToggle(creneau.id as 'matin' | 'apres_midi' | 'soir');
                      }}
                    >
                      {isAvailable ? "Retirer" : "Ajouter"}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`notes-${creneau.id}`} className="text-sm">
                    Notes (optionnel)
                  </Label>
                  <Textarea
                    id={`notes-${creneau.id}`}
                    placeholder="Ajoutez des notes pour ce créneau..."
                    value={notes[creneau.id] || slot?.notes || ''}
                    onChange={(e) => handleNotesChange(creneau.id, e.target.value)}
                    className="min-h-[60px]"
                  />
                   {notes[creneau.id] !== (slot?.notes || '') && (
                     <Button
                       size="sm"
                       variant="outline"
                       className="pointer-events-auto"
                       onClick={() => onUpdateSlot(creneau.id as 'matin' | 'apres_midi' | 'soir', isAvailable, notes[creneau.id] || '')}
                     >
                       Sauvegarder les notes
                     </Button>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Créneaux personnalisés */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">Créneaux personnalisés</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNewSlotForm(true)}
              className="flex items-center space-x-2 pointer-events-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter un créneau</span>
            </Button>
          </div>

          {/* Formulaire nouveau créneau */}
          {showNewSlotForm && (
            <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Nouveau créneau</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heure_debut">Heure de début</Label>
                  <Input
                    id="heure_debut"
                    type="time"
                    value={newSlot.heure_debut}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, heure_debut: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="heure_fin">Heure de fin</Label>
                  <Input
                    id="heure_fin"
                    type="time"
                    value={newSlot.heure_fin}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, heure_fin: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes_nouveau">Notes (optionnel)</Label>
                <Textarea
                  id="notes_nouveau"
                  placeholder="Ajoutez des notes pour ce créneau..."
                  value={newSlot.notes || ''}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddCustomSlot} className="pointer-events-auto">
                  Ajouter
                </Button>
                <Button variant="outline" onClick={() => setShowNewSlotForm(false)} className="pointer-events-auto">
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Liste des créneaux personnalisés */}
          {customTimeSlots.map((slot, index) => (
            <div key={slot.id || index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div>
                      <Label>Début</Label>
                      <Input
                        type="time"
                        value={slot.heure_debut}
                        onChange={(e) => handleCustomSlotChange(slot, 'heure_debut', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Fin</Label>
                      <Input
                        type="time"
                        value={slot.heure_fin}
                        onChange={(e) => handleCustomSlotChange(slot, 'heure_fin', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={slot.disponible ? "default" : "secondary"}
                    className={slot.disponible ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}
                  >
                    {slot.disponible ? "Disponible" : "Indisponible"}
                  </Badge>
                  <Button
                    variant={slot.disponible ? "destructive" : "default"}
                    size="sm"
                    className="pointer-events-auto"
                    onClick={() => handleCustomSlotChange(slot, 'disponible', !slot.disponible)}
                  >
                    {slot.disponible ? "Retirer" : "Ajouter"}
                  </Button>
                  {slot.id && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="pointer-events-auto"
                      onClick={() => onDeleteCustomSlot(slot.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Ajoutez des notes..."
                  value={slot.notes || ''}
                  onChange={(e) => handleCustomSlotChange(slot, 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Sélectionnez les créneaux où vous êtes disponible pour cette date.
            Vous pouvez utiliser les créneaux prédéfinis ou créer vos propres créneaux personnalisés.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}