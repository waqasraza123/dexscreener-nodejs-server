declare module 'antibotbrowser' {
    // Define the types of the module's exports as needed
    interface Antibotbrowser {
      startbrowser(port: number, url: string): Promise<{ websokcet: string }>;
    }
  
    const antibotbrowser: Antibotbrowser;
    export = antibotbrowser;
  }  