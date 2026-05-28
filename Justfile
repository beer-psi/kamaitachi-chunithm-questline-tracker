default:
    just --list

push:
    clasp push

apply-myt:
    git apply myt-patches/.clasp.json.patch myt-patches/src/Code.js.patch

unapply-myt:
    git apply -R myt-patches/.clasp.json.patch myt-patches/src/Code.js.patch

push-myt: apply-myt
    clasp push
    @just unapply-myt
