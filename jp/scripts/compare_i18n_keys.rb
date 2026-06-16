require 'yaml'

def flatten(data, prefix='')
  if data.is_a?(Hash)
    data.flat_map do |key, value|
      new_prefix = prefix.empty? ? key.to_s : "#{prefix}.#{key}"
      flatten(value, new_prefix)
    end
  else
    [[prefix, data]]
  end
end

de = YAML.load_file('_i18n/de.yml')
en = YAML.load_file('_i18n/en.yml')
de_keys = flatten(de).to_h
en_keys = flatten(en).to_h
missing = de_keys.keys - en_keys.keys
extra = en_keys.keys - de_keys.keys
puts "MISSING #{missing.size}"
missing.sort.each do |k|
  puts k
  puts '---'
  puts de_keys[k]
  puts
end
puts "EXTRA #{extra.size}"
extra.sort.each do |k|
  puts k
  puts '---'
  puts en_keys[k]
  puts
end