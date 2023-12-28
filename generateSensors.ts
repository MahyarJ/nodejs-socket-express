export type Sensor = {
  id: number;
  value: number;
};

const generateSensors = (length: number): Sensor[] => {
  return Array.from({ length }, (_, i) => {
    return {
      id: i,
      value: Math.floor(Math.random() * 100),
    };
  });
};

export default generateSensors;
