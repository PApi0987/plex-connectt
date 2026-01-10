export const buyData = (req, res) => {
  const { amount, phone_number } = req.body;
  res.status(200).json({ status: true, message: `Data ${amount} purchased for ${phone_number}` });
};

export const buyAirtime = (req, res) => {
  const { amount, phone_number } = req.body;
  res.status(200).json({ status: true, message: `Airtime ${amount} purchased for ${phone_number}` });
};

export const buyCable = (req, res) => {
  const { amount, cardnumber } = req.body;
  res.status(200).json({ status: true, message: `Cable plan ${amount} purchased for card ${cardnumber}` });
};

export const buyElectricity = (req, res) => {
  const { amount, meter_number } = req.body;
  res.status(200).json({ status: true, message: `Electricity ${amount} purchased for meter ${meter_number}` });
};
