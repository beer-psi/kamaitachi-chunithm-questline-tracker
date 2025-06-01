push:
    clasp push

push-m:
    git apply myt.patch
    clasp push
    git apply -R myt.patch
