default:
    just --list

push:
    node_modules/.bin/clasp push

apply-myt:
    git apply myt-patches/.clasp.json.patch myt-patches/src/Code.js.patch

unapply-myt:
    git apply -R myt-patches/.clasp.json.patch myt-patches/src/Code.js.patch

push-myt: apply-myt
    node_modules/.bin/clasp push
    @just unapply-myt
