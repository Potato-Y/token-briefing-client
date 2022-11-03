class OpenSource {
  constructor(name, url, copyright, license, licenseFullPhrase) {
    this.name = name;
    this.url = url;
    this.copyright = copyright;
    this.license = license;
    this.licenseFullPhrase = licenseFullPhrase;
  }

  get data() {
    return { name: this.name, url: this.url, copyright: this.copyright, license: this.license, licenseFullPhrase: this.licenseFullPhrase };
  }
}

module.exports = OpenSource;
