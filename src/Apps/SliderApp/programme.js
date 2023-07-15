const defaultExercices = []
const userExercices = []
const defaultModificators = []
const userModificators = []

let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
let units = ['rpe', 'percent', 'kg', 'lbs']
let types = ['squat', 'bench', 'deadlift', ...defaultExercices, ...userExercices]
let modificators = ['5cm deficit', 'strap', ...defaultModificators, ...userModificators]

export const addWeek = (programme) => {
  programme.data.push({
    name: 'week',
    data: []
  })

}

export const getProgramme = (programmeId) => {

  //TODO return programme according to programmeId

  return programme;

}

const programme = {
  name: 'programme1',
  startingDate: null,
  endingDate: null,
  id: 123456,
  data: [

    {
      name: 'week1',
      id: "123",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },




    {
      name: 'week2',
      id: "234",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
            {
              name: 'workout2',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'workout2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },

    {
      name: 'week3',
      id: "345",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
            {
              name: 'workout2',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'workout2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },

    {
      name: 'week4',
      id: "456",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
            {
              name: 'workout2',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'workout2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },

    {
      name: 'week5',
      id: "567",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
            {
              name: 'workout2',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'workout2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },

    {
      name: 'week6',
      id: "678",
      data: [
        
        {
          name: 'day1',
          day: 'tue',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
            {
              name: 'workout2',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'exercice2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },
        
        
        {
          name: 'day2',
          day: 'wed',
          date: null, // calculated when enter starting_date
          data: [
            {
              name: 'workout1',
              data: [
                {
                  name: 'exercice1',
                  type: 'squat',
                  data: [
                    {
                      rep: 3,
                      intensity: 9,
                      unit: 'rpe',
                      topSet: true,
                    },
                    {
                      rep: 5,
                      intensity: 80,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
                {
                  name: 'workout2',
                  type: 'bench',
                  data: [
                    {
                      rep: -1, // AMRAP
                      intensity: 75,
                      unit: 'kg',
                      topSet: true,
                    },
                    {
                      rep: 6,
                      intensity: 75,
                      unit: 'percent',
                      topSet: false,
                    },
                  ]
                },
              ]
            },
          ]
        },

      ]
    },

  ]
}
