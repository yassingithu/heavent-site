# Faux service de fichiers Supabase (127.0.0.1 uniquement) : /auth/v1/health et /storage/v1/object/authenticated/<espace>/<chemin>
import http.server, os, sys, urllib.parse
RACINE = sys.argv[1]; PORT = int(sys.argv[2])
class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if self.path.startswith("/auth/v1/health"):
            self.send_response(200); self.end_headers(); self.wfile.write(b"ok"); return
        if self.headers.get("Authorization") != "Bearer cle-fichiers-factice":
            self.send_response(401); self.end_headers(); return
        p = "/storage/v1/object/authenticated/"
        if not self.path.startswith(p): self.send_response(404); self.end_headers(); return
        f = os.path.join(RACINE, urllib.parse.unquote(self.path[len(p):]))
        if not os.path.isfile(f): self.send_response(400); self.end_headers(); self.wfile.write(b'{"error":"not_found"}'); return
        d = open(f, "rb").read(); self.send_response(200); self.send_header("Content-Length", str(len(d))); self.end_headers(); self.wfile.write(d)
http.server.HTTPServer(("127.0.0.1", PORT), H).serve_forever()
