import React from "react";

export default function a() {
  const NV = [
    { name: "Manh", salary: 3000 },
    { name: "Khai", salary: 4000 },
    { name: "Thanh", salary: 5000 },
  ];
  let salaryUp = (num, rate) => {
    return num + num * rate;
  };
  let salaryDown = (num, rate) => {
    return num - num * rate;
  };
  const Calculature = (data, action, rate) => {
    let result = [];
    for (const item of data) {
      let name = item.name;
      let newSalary = salaryDown(item.salary, rate);

      result.push({ name, newSalary });
    }
    console.log(data);
    return result;
  };
  console.log(Calculature(NV, salaryDown, 0.05));
  return <div>a</div>;
}
