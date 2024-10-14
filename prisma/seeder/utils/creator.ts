export const batchCreate = async <T>(
  model: any,
  data: T[],
  batchSize: number = 1000,
) => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await model.createMany({
      data: batch,
      skipDuplicates: true,
    });
  }
};
