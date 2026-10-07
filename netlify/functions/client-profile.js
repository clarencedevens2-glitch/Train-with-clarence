exports.handler = async function(event) {

  const token = (event.queryStringParameters && event.queryStringParameters.token) || '';

  const profiles = [];

  if (process.env.JUDY_PORTAL_TOKEN) profiles.push({

    token: process.env.JUDY_PORTAL_TOKEN,

    profile: {

      id: 'JUDY-001',

      type: 'Personal Training Client Portal',

      name: 'Judy',

      welcome: 'Hi Judy. What would you like help with today?',

      intro: 'Use this page to check in about your workouts, goals, progress, and what you want to work on between sessions.',

      prompts: [

        'What should I work on this week?',

        'Log a workout',

        'Tell Clarence how this week went'

      ]

    }

  });

  if (process.env.BRYCE_PORTAL_TOKEN) profiles.push({

    token: process.env.BRYCE_PORTAL_TOKEN,

    profile: {

      id: 'BRYCE-001',

      type: 'Personal Fitness Merit Badge Tracker',

      name: 'Bryce',

      welcome: 'Hi Bryce. What do you want to log today?',

      intro: 'Use this page to keep track of your Personal Fitness Merit Badge work, including workouts, activity, nutrition notes, and progress.',

      prompts: [

        'Log a workout',

        'Log food and nutrition',

        'Record progress'

      ]

    }

  });

  const match = profiles.find(x => x.token === token);

  if (!match) {

    return {

      statusCode: 401,

      headers: {

        'Content-Type': 'application/json',

        'Cache-Control': 'no-store'

      },

      body: JSON.stringify({ error: 'Invalid or expired client link.' })

    };

  }

  return {

    statusCode: 200,

    headers: {

      'Content-Type': 'application/json',

      'Cache-Control': 'no-store'

    },

    body: JSON.stringify(match.profile)

  };

};
