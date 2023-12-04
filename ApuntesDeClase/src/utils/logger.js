function logger(request, response, next) {
  // console.log(`VAL --> ${request.method} - ${request.originalUrl} - ${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}`);

  next();
}

export { logger };
