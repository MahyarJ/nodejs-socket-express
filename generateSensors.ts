export type Sensor = {
  index: number;
  id: number;
};

const generateSensors = (length: number): Sensor[] => {
  return Array.from({ length }, (_, i) => {
    return {
      index: i,
      id: Math.floor(Math.random() * 100),
    };
  });
};

export default generateSensors;
