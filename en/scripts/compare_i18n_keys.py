import yaml
from pathlib import Path

def flatten(data, prefix=''):
    if isinstance(data, dict):
        for key, value in data.items():
            new_prefix = f"{prefix}.{key}" if prefix else key
            yield from flatten(value, new_prefix)
    else:
        yield prefix, data

files = [('_i18n/de.yml', '_i18n/en.yml')]
for de_path, en_path in files:
    de = yaml.safe_load(Path(de_path).read_text(encoding='utf-8'))
    en = yaml.safe_load(Path(en_path).read_text(encoding='utf-8'))
    de_keys = {k:v for k,v in flatten(de)}
    en_keys = {k:v for k,v in flatten(en)}
    missing = sorted(k for k in de_keys if k not in en_keys)
    extra = sorted(k for k in en_keys if k not in de_keys)
    print('MISSING', len(missing))
    for k in missing:
        print(k)
        print('---')
        print(de_keys[k])
        print()
    print('EXTRA', len(extra))
    for k in extra:
        print(k)
        print('---')
        print(en_keys[k])
        print()
