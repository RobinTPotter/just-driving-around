#!/usr/bin/env python3

import http.server
import json
from pathlib import Path
import sys

PORT = int(sys.argv[1])

class Handler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path != "/save":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", 0))
        data = self.rfile.read(length)

        try:
            request = json.loads(data)

            filename = request["filename"]
            body = request["body"]

            # Basic safety: only allow files in current directory
            filename = Path(filename).name

            with open(filename, "w", encoding="utf-8") as f:
                json.dump(body, f, indent=2)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "saved": filename
            }).encode())

        except Exception as e:
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "error",
                "message": str(e)
            }).encode())


http.server.ThreadingHTTPServer(("", PORT), Handler).serve_forever()

