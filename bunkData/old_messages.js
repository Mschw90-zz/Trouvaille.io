module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Tyrone Scafe changed the trip time to 5PM",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 20, 0)),
    system: true
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      "Sounds good",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 28, 0)),
    user: {
      _id: 2,
      name: "Tyrone Scafe"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      "That works for me",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 27, 0)),
    user: {
      _id: 1,
      name: "Alex Glaze"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      "Let's do 5PM",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 25, 0)),
    user: {
      _id: 2,
      name: "Matt Schwartz"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "What time would you guys wanna head out?",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Tyrone Scafe"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Tyrone created this trip for 12-21-2017",
    createdAt: new Date(Date.UTC(2017, 11, 10, 17, 20, 0)),
    system: true
  }
];;
