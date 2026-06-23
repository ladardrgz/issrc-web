(function registerCloudinaryMediaLibrary() {
  /*
   * El adaptador compatible con Decap expone `NetlifyCmsMediaLibraryCloudinary`.
   * Decap expone `CMS`. Esperamos a que ambos existan y recién ahí registramos
   * la biblioteca de medios. No se guardan claves privadas en este archivo.
   */
  if (window.CMS && window.NetlifyCmsMediaLibraryCloudinary) {
    window.CMS.registerMediaLibrary(window.NetlifyCmsMediaLibraryCloudinary);
    return;
  }

  window.setTimeout(registerCloudinaryMediaLibrary, 50);
})();
