export function initDb(callback: any) {
  let db: IDBDatabase;
  const request = indexedDB.open("fs-demo", 1);

  request.onupgradeneeded = function () {
    // init db
    db = request.result;
    db.createObjectStore("folder", { autoIncrement: true });
  };

  request.onerror = function () {
    console.error("Error", request.error);
  };

  request.onsuccess = function () {
    db = request.result;
    callback(db);
  };

  function addFs(fs: any) {
    const transaction = db.transaction("folder", "readwrite");
    const objectStore = transaction.objectStore("folder");

    objectStore.add(fs);
  }

  function getFs(): Promise<any> {
    const transaction = db.transaction("folder");
    const objectStore = transaction.objectStore("folder");
    const result = objectStore.get(1);

    return new Promise((resolve) => {
      result.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      result.onerror = (_event: any) => {
        resolve(null);
      };
    });
  }

  return {
    getFs,
    addFs,
  };
}
