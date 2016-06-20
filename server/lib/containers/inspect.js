export default function inspectContainer(id) {
  return new Promise((resolve, reject) => {
    docker.getContainer(id)
          .inspect((err, data) => {
            if (err) {
              console.log('inspectContainer(): ', err);
              reject(err);
            }
            resolve(new ContainerJSONBase(data));
          });
  });
}
