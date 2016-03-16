function FormData() {
   var data = {};
   this.append = (k, v) => data[k] = v;
   this._peekInside = k => data[k];
}

function fetch(url, options) {
   if (url !== "/images" || !options || options.method !== "POST" || !(options.body instanceof FormData))
      throw new Error("This faked up version of fetch() only supports posting form data to /images");

   return readAsDataURL(options.body._peekInside("file"))
      .then(url => pauseThenForward(5000, url))
      .then(url => new Response(null, {
         status: 201,
         statusText: "Created",
         headers: { Location: url }
      }));
}

function pauseThenForward(time_ms, valueToForward) {
   return new Promise(resolve => {
      setTimeout(() => resolve(valueToForward), time_ms);
   });
}
