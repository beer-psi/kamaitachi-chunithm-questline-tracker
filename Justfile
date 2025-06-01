push:
    @clasp push

push-m:
    @mv .clasp.json .clasp.standard.json
    @mv .clasp.m.json .clasp.json
    @clasp push
    @mv .clasp.json .clasp.m.json
    @mv .clasp.standard.json .clasp.json
