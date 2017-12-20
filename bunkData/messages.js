module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Roger that!',
    createdAt: new Date(Date.UTC(2017, 11, 21, 17, 25, 0)),
    user: {
      _id: 1,
      name: 'Alex Glaze',
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Can anyone bring an extra phone charger?',
    createdAt: new Date(Date.UTC(2017, 11, 21, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Matt Schwartz',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Your trip starts today at 5PM.",
    createdAt: new Date(Date.UTC(2017, 11, 21, 17, 25, 0)),
    system: true,
  },
];
