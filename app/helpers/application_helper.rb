module ApplicationHelper

  def javascript_include_pack(name)
    manifest = JSON.parse(File.read(Rails.public_path.join('packs/manifest.json')))
    pack = manifest.fetch(name)
    javascript_include_tag('/packs/' + pack.fetch('src'))
  end
end
