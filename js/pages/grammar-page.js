// =========================================================
// ZenG English Learn
// Grammar Learning Page
// =========================================================
//
// International English content.
// No Hindi translations.
// Beginner-friendly explanations.
// Daily-life examples.
// Common doubts and mistakes included.
// =========================================================


// =========================================================
// GRAMMAR CHAPTERS
// =========================================================

const GRAMMAR_CHAPTERS = [

  {
    id: "nouns",
    number: 1,
    title: "Nouns",
    icon: "📝",
    shortDescription:
      "Learn the words we use to name people, places, things and ideas.",

    intro:
      "A noun is a word we use to name someone, somewhere, something, or an idea.",

    sections: [

      {
        title: "What is a noun?",
        content: `
          <p>
            A noun is a naming word.
          </p>

          <p>
            We use nouns when we talk about people, places, things,
            animals, and ideas.
          </p>

          <div class="grammar-example">
            <strong>People:</strong>
            teacher, friend, mother, student
          </div>

          <div class="grammar-example">
            <strong>Places:</strong>
            school, home, London, park
          </div>

          <div class="grammar-example">
            <strong>Things:</strong>
            phone, book, table, bicycle
          </div>

          <div class="grammar-example">
            <strong>Ideas:</strong>
            happiness, love, freedom, friendship
          </div>
        `
      },

      {
        title: "Nouns in daily life",
        content: `
          <p>
            You use nouns almost every time you speak.
          </p>

          <div class="grammar-example">
            I left my <strong>phone</strong> at home.
          </div>

          <div class="grammar-example">
            My <strong>brother</strong> goes to <strong>school</strong>.
          </div>

          <div class="grammar-example">
            We bought some <strong>food</strong>.
          </div>

          <div class="grammar-example">
            The <strong>dog</strong> is sleeping.
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Do names count as nouns?</strong>
            <p>
              Yes. Names of people and places are nouns.
            </p>
            <div class="grammar-example">
              Emma, Daniel, Paris, India
            </div>
          </div>

          <div class="grammar-doubt">
            <strong>Can an idea be a noun?</strong>
            <p>
              Yes. Things we cannot touch can still be nouns.
            </p>
            <div class="grammar-example">
              love, happiness, time, knowledge
            </div>
          </div>
        `
      },

      {
        title: "Quick Practice",
        content: `
          <p>Find the nouns in this sentence:</p>

          <div class="grammar-question">
            My friend bought a new phone yesterday.
          </div>

          <p>
            Answer:
            <strong>friend, phone</strong>
          </p>
        `
      }

    ]
  },


  // =======================================================
  // PRONOUNS
  // =======================================================

  {
    id: "pronouns",
    number: 2,
    title: "Pronouns",
    icon: "👤",
    shortDescription:
      "Learn words that we use instead of repeating names and nouns.",

    intro:
      "Pronouns help us avoid repeating the same noun again and again.",

    sections: [

      {
        title: "What is a pronoun?",
        content: `
          <p>
            A pronoun is a word that can be used instead of a noun.
          </p>

          <div class="grammar-example">
            <strong>Emma</strong> is my friend.
            <br>
            <strong>She</strong> is very kind.
          </div>

          <p>
            We use <strong>she</strong> instead of repeating
            <strong>Emma</strong>.
          </p>
        `
      },

      {
        title: "Common pronouns",
        content: `
          <div class="grammar-example">
            <strong>I</strong> — I am learning English.
          </div>

          <div class="grammar-example">
            <strong>You</strong> — You are my friend.
          </div>

          <div class="grammar-example">
            <strong>He</strong> — He works here.
          </div>

          <div class="grammar-example">
            <strong>She</strong> — She lives nearby.
          </div>

          <div class="grammar-example">
            <strong>It</strong> — It is raining.
          </div>

          <div class="grammar-example">
            <strong>We</strong> — We are ready.
          </div>

          <div class="grammar-example">
            <strong>They</strong> — They are students.
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>What is the difference between he and him?</strong>
            <p>
              Use <strong>he</strong> when the person does the action.
              Use <strong>him</strong> when the action happens to that person.
            </p>

            <div class="grammar-example">
              <strong>He</strong> called me.
            </div>

            <div class="grammar-example">
              I called <strong>him</strong>.
            </div>
          </div>

          <div class="grammar-doubt">
            <strong>Should I say "Me and John went"?</strong>
            <p>
              In standard English, say:
            </p>

            <div class="grammar-example">
              <strong>John and I went</strong> to the shop.
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // VERBS
  // =======================================================

  {
    id: "verbs",
    number: 3,
    title: "Verbs",
    icon: "🏃",
    shortDescription:
      "Learn action words and words that describe states or situations.",

    intro:
      "A verb tells us what someone or something does, or what state they are in.",

    sections: [

      {
        title: "What is a verb?",
        content: `
          <p>
            Verbs are action or state words.
          </p>

          <div class="grammar-example">
            I <strong>run</strong> every morning.
          </div>

          <div class="grammar-example">
            She <strong>cooks</strong> dinner.
          </div>

          <div class="grammar-example">
            They <strong>play</strong> football.
          </div>

          <div class="grammar-example">
            He <strong>is</strong> tired.
          </div>
        `
      },

      {
        title: "Verbs you use every day",
        content: `
          <div class="grammar-example">
            wake up
          </div>

          <div class="grammar-example">
            eat
          </div>

          <div class="grammar-example">
            drink
          </div>

          <div class="grammar-example">
            work
          </div>

          <div class="grammar-example">
            study
          </div>

          <div class="grammar-example">
            sleep
          </div>

          <div class="grammar-example">
            talk
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Why do we say "She works" but "They work"?</strong>
            <p>
              In the present simple, verbs usually take
              <strong>-s</strong> or <strong>-es</strong>
              with he, she, and it.
            </p>

            <div class="grammar-example">
              She <strong>works</strong> here.
            </div>

            <div class="grammar-example">
              They <strong>work</strong> here.
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // ADJECTIVES
  // =======================================================

  {
    id: "adjectives",
    number: 4,
    title: "Adjectives",
    icon: "✨",
    shortDescription:
      "Learn words that describe people, places, animals and things.",

    intro:
      "An adjective gives us more information about a noun.",

    sections: [

      {
        title: "What is an adjective?",
        content: `
          <p>
            Adjectives describe nouns.
          </p>

          <div class="grammar-example">
            a <strong>big</strong> house
          </div>

          <div class="grammar-example">
            a <strong>red</strong> car
          </div>

          <div class="grammar-example">
            a <strong>friendly</strong> teacher
          </div>

          <div class="grammar-example">
            a <strong>cold</strong> drink
          </div>
        `
      },

      {
        title: "Adjectives in daily life",
        content: `
          <div class="grammar-example">
            My room is <strong>small</strong>.
          </div>

          <div class="grammar-example">
            This coffee is <strong>hot</strong>.
          </div>

          <div class="grammar-example">
            She has a <strong>beautiful</strong> bag.
          </div>

          <div class="grammar-example">
            That movie was <strong>funny</strong>.
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Does an adjective describe a verb?</strong>
            <p>
              Usually, no. Adjectives describe nouns or pronouns.
              Adverbs are commonly used to describe verbs.
            </p>
          </div>

          <div class="grammar-doubt">
            <strong>Which sounds better?</strong>

            <div class="grammar-example">
              a car <strong>red</strong> ❌
            </div>

            <div class="grammar-example">
              a <strong>red car</strong> ✅
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // ADVERBS
  // =======================================================

  {
    id: "adverbs",
    number: 5,
    title: "Adverbs",
    icon: "⚡",
    shortDescription:
      "Learn words that tell us how, when, where or how often something happens.",

    intro:
      "Adverbs give us more information about an action or situation.",

    sections: [

      {
        title: "What is an adverb?",
        content: `
          <p>
            Adverbs can tell us how, when, where, or how often
            something happens.
          </p>

          <div class="grammar-example">
            She speaks <strong>slowly</strong>.
          </div>

          <div class="grammar-example">
            I will call you <strong>tomorrow</strong>.
          </div>

          <div class="grammar-example">
            Come <strong>here</strong>.
          </div>

          <div class="grammar-example">
            I <strong>usually</strong> drink coffee in the morning.
          </div>
        `
      },

      {
        title: "Common types",
        content: `
          <div class="grammar-example">
            <strong>How?</strong> quickly, slowly, carefully
          </div>

          <div class="grammar-example">
            <strong>When?</strong> today, yesterday, soon
          </div>

          <div class="grammar-example">
            <strong>Where?</strong> here, there, outside
          </div>

          <div class="grammar-example">
            <strong>How often?</strong> always, usually, sometimes, never
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>What is the difference between "quick" and "quickly"?</strong>

            <div class="grammar-example">
              He is a <strong>quick</strong> learner.
            </div>

            <div class="grammar-example">
              He learns <strong>quickly</strong>.
            </div>

            <p>
              <strong>Quick</strong> describes a noun.
              <strong>Quickly</strong> describes an action.
            </p>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // TENSES
  // =======================================================

  {
    id: "tenses",
    number: 6,
    title: "Tenses",
    icon: "⏳",
    shortDescription:
      "Learn how English shows when an action happens.",

    intro:
      "Tenses help us understand whether something happens now, happened before, or will happen later.",

    sections: [

      {
        title: "The basic idea",
        content: `
          <p>
            Think about time in three simple ways:
          </p>

          <div class="grammar-example">
            <strong>Present:</strong>
            I work every day.
          </div>

          <div class="grammar-example">
            <strong>Past:</strong>
            I worked yesterday.
          </div>

          <div class="grammar-example">
            <strong>Future:</strong>
            I will work tomorrow.
          </div>
        `
      },

      {
        title: "Present Simple",
        content: `
          <p>
            Use the present simple for habits, routines,
            facts and things that are generally true.
          </p>

          <div class="grammar-example">
            I <strong>wake up</strong> at 7 every day.
          </div>

          <div class="grammar-example">
            She <strong>works</strong> at a bank.
          </div>

          <div class="grammar-example">
            Water <strong>boils</strong> at 100°C.
          </div>
        `
      },

      {
        title: "Past Simple",
        content: `
          <p>
            Use the past simple for completed actions in the past.
          </p>

          <div class="grammar-example">
            I <strong>visited</strong> my friend yesterday.
          </div>

          <div class="grammar-example">
            We <strong>watched</strong> a movie last night.
          </div>
        `
      },

      {
        title: "Future",
        content: `
          <p>
            We often use <strong>will</strong> when talking about
            future decisions, predictions or events.
          </p>

          <div class="grammar-example">
            I <strong>will call</strong> you later.
          </div>

          <div class="grammar-example">
            It <strong>will rain</strong> tomorrow.
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Is "I am go to school" correct?</strong>

            <div class="grammar-example">
              I am go to school. ❌
            </div>

            <div class="grammar-example">
              I go to school. ✅
            </div>

            <p>
              For a regular habit, use the present simple.
            </p>
          </div>

          <div class="grammar-doubt">
            <strong>What is the difference between "I went" and "I have gone"?</strong>
            <p>
              This is a more advanced tense difference.
              We will study it separately when we reach perfect tenses.
            </p>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // PREPOSITIONS
  // =======================================================

  {
    id: "prepositions",
    number: 7,
    title: "Prepositions",
    icon: "📍",
    shortDescription:
      "Learn words that show place, time, direction and relationships.",

    intro:
      "Prepositions help us explain where, when, or how things are connected.",

    sections: [

      {
        title: "Common prepositions",
        content: `
          <div class="grammar-example">
            The keys are <strong>on</strong> the table.
          </div>

          <div class="grammar-example">
            The shoes are <strong>under</strong> the bed.
          </div>

          <div class="grammar-example">
            I live <strong>in</strong> London.
          </div>

          <div class="grammar-example">
            Meet me <strong>at</strong> the station.
          </div>
        `
      },

      {
        title: "In, on and at",
        content: `
          <p>
            These three small words often cause confusion.
          </p>

          <div class="grammar-example">
            <strong>In</strong> a room, city, country
          </div>

          <div class="grammar-example">
            <strong>On</strong> a table, wall, page
          </div>

          <div class="grammar-example">
            <strong>At</strong> a place or specific point
          </div>

          <div class="grammar-example">
            I am <strong>at</strong> the bus stop.
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Do we say "in Monday"?</strong>

            <div class="grammar-example">
              in Monday ❌
            </div>

            <div class="grammar-example">
              <strong>on Monday</strong> ✅
            </div>
          </div>

          <div class="grammar-doubt">
            <strong>Do we say "at night" or "in night"?</strong>

            <div class="grammar-example">
              <strong>at night</strong> ✅
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // CONJUNCTIONS
  // =======================================================

  {
    id: "conjunctions",
    number: 8,
    title: "Conjunctions",
    icon: "🔗",
    shortDescription:
      "Learn words that connect words, ideas and sentences.",

    intro:
      "Conjunctions connect different parts of a sentence.",

    sections: [

      {
        title: "Common conjunctions",
        content: `
          <div class="grammar-example">
            I like tea <strong>and</strong> coffee.
          </div>

          <div class="grammar-example">
            Do you want tea <strong>or</strong> coffee?
          </div>

          <div class="grammar-example">
            I was tired, <strong>but</strong> I finished my work.
          </div>

          <div class="grammar-example">
            I stayed home <strong>because</strong> it was raining.
          </div>
        `
      },

      {
        title: "How they change meaning",
        content: `
          <div class="grammar-example">
            I wanted to go, <strong>but</strong> I was busy.
          </div>

          <p>
            <strong>But</strong> shows a contrast.
          </p>

          <div class="grammar-example">
            I stayed home <strong>because</strong> I was tired.
          </div>

          <p>
            <strong>Because</strong> gives a reason.
          </p>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Can I start a sentence with "And" or "But"?</strong>
            <p>
              Yes. It is possible in natural English,
              especially in conversation and informal writing.
            </p>

            <div class="grammar-example">
              I wanted to call you.
              <strong>But</strong> I was busy.
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // ARTICLES
  // =======================================================

  {
    id: "articles",
    number: 9,
    title: "Articles",
    icon: "🔤",
    shortDescription:
      "Learn how to use a, an and the naturally in everyday English.",

    intro:
      "Articles are small words that come before nouns.",

    sections: [

      {
        title: "A and an",
        content: `
          <p>
            Use <strong>a</strong> or <strong>an</strong>
            when talking about one non-specific thing.
          </p>

          <div class="grammar-example">
            I saw <strong>a</strong> dog.
          </div>

          <div class="grammar-example">
            She ate <strong>an</strong> apple.
          </div>

          <p>
            Use <strong>an</strong> before a vowel sound.
          </p>
        `
      },

      {
        title: "The",
        content: `
          <p>
            We often use <strong>the</strong> when the listener
            knows which person or thing we mean.
          </p>

          <div class="grammar-example">
            I bought <strong>a</strong> book.
          </div>

          <div class="grammar-example">
            <strong>The</strong> book is very interesting.
          </div>

          <p>
            The first sentence introduces the book.
            The second sentence talks about that specific book.
          </p>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Why do we say "an hour"?</strong>

            <p>
              Because the important thing is the sound,
              not simply the first letter.
            </p>

            <div class="grammar-example">
              <strong>an hour</strong> ✅
            </div>
          </div>

          <div class="grammar-doubt">
            <strong>Why do we say "a university"?</strong>

            <p>
              Because "university" begins with a "yoo" sound.
            </p>

            <div class="grammar-example">
              <strong>a university</strong> ✅
            </div>
          </div>
        `
      }

    ]
  },


  // =======================================================
  // SENTENCE STRUCTURE
  // =======================================================

  {
    id: "sentence-structure",
    number: 10,
    title: "Sentence Structure",
    icon: "🧩",
    shortDescription:
      "Learn how English words fit together to make clear sentences.",

    intro:
      "Good sentence structure helps you express your ideas clearly.",

    sections: [

      {
        title: "The basic pattern",
        content: `
          <p>
            A very common English sentence pattern is:
          </p>

          <div class="grammar-formula">
            Subject + Verb + Object
          </div>

          <div class="grammar-example">
            <strong>I</strong> <strong>eat</strong> <strong>breakfast</strong>.
          </div>

          <div class="grammar-example">
            <strong>She</strong> <strong>reads</strong> <strong>books</strong>.
          </div>

          <div class="grammar-example">
            <strong>They</strong> <strong>play</strong> <strong>football</strong>.
          </div>
        `
      },

      {
        title: "Build a sentence step by step",
        content: `
          <p>
            Start with who or what you are talking about.
          </p>

          <div class="grammar-example">
            <strong>I</strong>
          </div>

          <p>
            Add the action.
          </p>

          <div class="grammar-example">
            <strong>I drink</strong>
          </div>

          <p>
            Add more information.
          </p>

          <div class="grammar-example">
            <strong>I drink coffee every morning.</strong>
          </div>
        `
      },

      {
        title: "Questions",
        content: `
          <p>
            English questions often change the word order.
          </p>

          <div class="grammar-example">
            You are ready.
          </div>

          <div class="grammar-example">
            <strong>Are you ready?</strong>
          </div>

          <div class="grammar-example">
            You like coffee.
          </div>

          <div class="grammar-example">
            <strong>Do you like coffee?</strong>
          </div>
        `
      },

      {
        title: "Common Doubts",
        content: `
          <div class="grammar-doubt">
            <strong>Why can't I translate every sentence word by word?</strong>

            <p>
              English and your first language may use different
              sentence structures. A direct word-for-word translation
              can sometimes sound unnatural.
            </p>

            <div class="grammar-example">
              Learn the English sentence as a complete pattern.
            </div>
          </div>

          <div class="grammar-doubt">
            <strong>Does every English sentence have a verb?</strong>

            <p>
              Most complete English sentences need a verb.
            </p>

            <div class="grammar-example">
              She <strong>is</strong> happy. ✅
            </div>

            <div class="grammar-example">
              She happy. ❌
            </div>
          </div>
        `
      }

    ]
  }

];


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// =========================================================
// PAGE STYLES
// =========================================================
//
// These styles are injected once so grammar-page.js does not
// require another CSS file just for chapter content.
// =========================================================

function ensureGrammarStyles() {

  if (
    document.getElementById(
      "zengGrammarPageStyles"
    )
  ) {

    return;

  }


  const style =
    document.createElement("style");


  style.id =
    "zengGrammarPageStyles";


  style.textContent = `

    .grammar-page {

      width:min(100%,700px);

      margin:0 auto;

    }


    .grammar-back-button {

      border:none;

      background:transparent;

      color:var(--primary);

      font-size:13px;

      font-weight:750;

      cursor:pointer;

      padding:6px 0;

    }


    .grammar-header-card {

      margin-top:10px;

      padding:22px;

    }


    .grammar-header-icon {

      font-size:38px;

      margin-bottom:8px;

    }


    .grammar-header-title {

      font-size:22px;

      font-weight:800;

    }


    .grammar-header-description {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:13px;

      line-height:1.55;

    }


    .grammar-section-title {

      margin-top:22px;

      margin-bottom:12px;

      font-size:18px;

      font-weight:800;

    }


    .grammar-topic-list {

      display:flex;

      flex-direction:column;

      gap:10px;

    }


    .grammar-topic-card {

      width:100%;

      border:none;

      text-align:left;

      cursor:pointer;

      padding:17px;

      display:flex;

      align-items:center;

      gap:13px;

    }


    .grammar-topic-card:active {

      transform:scale(.99);

    }


    .grammar-topic-icon {

      width:42px;

      height:42px;

      border-radius:13px;

      background:var(--surface-soft);

      display:flex;

      align-items:center;

      justify-content:center;

      font-size:24px;

      flex-shrink:0;

    }


    .grammar-topic-number {

      font-size:10px;

      color:var(--text-muted);

      margin-bottom:2px;

    }


    .grammar-topic-title {

      font-size:15px;

      font-weight:800;

    }


    .grammar-topic-description {

      margin-top:4px;

      color:var(--text-secondary);

      font-size:11px;

      line-height:1.4;

    }


    .grammar-chapter {

      width:100%;

    }


    .grammar-chapter-top {

      margin-top:10px;

    }


    .grammar-chapter-title {

      margin-top:10px;

      font-size:23px;

      font-weight:850;

      color:var(--primary);

    }


    .grammar-chapter-intro {

      margin-top:7px;

      color:var(--text-secondary);

      font-size:13px;

      line-height:1.55;

    }


    .grammar-content-section {

      margin-top:16px;

      padding:18px;

    }


    .grammar-content-section h3 {

      margin:0 0 11px;

      font-size:16px;

      font-weight:800;

    }


    .grammar-content-section p {

      margin:0 0 10px;

      font-size:13px;

      line-height:1.65;

    }


    .grammar-content-section p:last-child {

      margin-bottom:0;

    }


    .grammar-example {

      margin-top:9px;

      padding:11px 12px;

      border-radius:11px;

      background:var(--surface-soft);

      font-size:12px;

      line-height:1.55;

    }


    .grammar-formula {

      margin:12px 0;

      padding:13px;

      border-radius:12px;

      background:var(--surface-soft);

      text-align:center;

      font-weight:800;

      font-size:13px;

    }


    .grammar-doubt {

      margin-top:11px;

      padding:13px;

      border-left:4px solid var(--primary);

      border-radius:10px;

      background:var(--surface-soft);

    }


    .grammar-doubt > strong {

      display:block;

      font-size:13px;

      margin-bottom:6px;

    }


    .grammar-doubt p {

      margin:0 0 7px;

    }


    .grammar-doubt .grammar-example {

      background:var(--surface);

    }


    .grammar-progress {

      margin-top:18px;

      padding:15px;

      text-align:center;

      color:var(--text-secondary);

      font-size:11px;

    }

  `;


  document.head.appendChild(
    style
  );

}


// =========================================================
// RENDER GRAMMAR LIST
// =========================================================

function renderGrammarList(
  container
) {

  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div class="grammar-page">

          <button
            type="button"
            class="grammar-back-button"
            id="grammarBackButton"
          >
            ← Back to Dashboard
          </button>


          <div
            class="card grammar-header-card"
          >

            <div class="grammar-header-icon">
              📝
            </div>

            <div class="grammar-header-title">
              Learn English Grammar
            </div>

            <div class="grammar-header-description">
              Build your English step by step with simple
              explanations, everyday examples and practical
              guidance.
            </div>

          </div>


          <div class="grammar-section-title">
            10 Basic Grammar Topics
          </div>


          <div class="grammar-topic-list">

            ${GRAMMAR_CHAPTERS.map(
              (chapter) => `

                <button
                  type="button"
                  class="card grammar-topic-card"
                  data-grammar-topic="${escapeHTML(chapter.id)}"
                >

                  <div class="grammar-topic-icon">
                    ${chapter.icon}
                  </div>


                  <div>

                    <div class="grammar-topic-number">
                      Chapter ${chapter.number}
                    </div>

                    <div class="grammar-topic-title">
                      ${escapeHTML(chapter.title)}
                    </div>

                    <div class="grammar-topic-description">
                      ${escapeHTML(chapter.shortDescription)}
                    </div>

                  </div>

                </button>

              `
            ).join("")}

          </div>


          <div class="card grammar-progress">

            Complete each chapter at your own pace.
            More advanced grammar can be added as you progress.

          </div>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById("grammarBackButton")
    ?.addEventListener(
      "click",
      () => {

        window.dispatchEvent(
          new CustomEvent(
            "zeng:navigate",
            {
              detail: {
                page: "dashboard"
              }
            }
          )
        );

      }
    );


  container
    .querySelectorAll(
      "[data-grammar-topic]"
    )
    .forEach(
      (card) => {

        card.addEventListener(
          "click",
          () => {

            const id =
              card.dataset.grammarTopic;


            renderGrammarChapter(
              container,
              id
            );

          }
        );

      }
    );

}


// =========================================================
// RENDER CHAPTER
// =========================================================

function renderGrammarChapter(
  container,
  chapterId
) {

  const chapter =
    GRAMMAR_CHAPTERS.find(
      (item) =>
        item.id === chapterId
    );


  if (!chapter) {

    renderGrammarList(
      container
    );

    return;

  }


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div class="grammar-page grammar-chapter">

          <div class="grammar-chapter-top">

            <button
              type="button"
              class="grammar-back-button"
              id="chapterBackButton"
            >
              ← All Grammar Topics
            </button>

          </div>


          <div
            style="
              margin-top:16px;
              font-size:36px;
            "
          >
            ${chapter.icon}
          </div>


          <div class="grammar-chapter-title">
            Chapter ${chapter.number}: ${escapeHTML(chapter.title)}
          </div>


          <div class="grammar-chapter-intro">
            ${escapeHTML(chapter.intro)}
          </div>


          ${chapter.sections.map(
            (section) => `

              <div
                class="card grammar-content-section"
              >

                <h3>
                  ${escapeHTML(section.title)}
                </h3>

                ${section.content}

              </div>

            `
          ).join("")}


          <div class="card grammar-progress">

            You have reached the end of this chapter.
            Review the examples and try using them in your
            own everyday English.

          </div>


          <button
            type="button"
            class="primary-button w-full"
            id="chapterDoneButton"
            style="
              margin-top:12px;
            "
          >
            Back to Grammar Topics
          </button>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById(
      "chapterBackButton"
    )
    ?.addEventListener(
      "click",
      () => {

        renderGrammarList(
          container
        );

      }
    );


  document
    .getElementById(
      "chapterDoneButton"
    )
    ?.addEventListener(
      "click",
      () => {

        renderGrammarList(
          container
        );

      }
    );

}


// =========================================================
// PUBLIC RENDER FUNCTION
// =========================================================

function renderGrammarPage(
  container,
  options = {}
) {

  if (!container) {
    return;
  }


  ensureGrammarStyles();


  renderGrammarList(
    container
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  GRAMMAR_CHAPTERS,

  renderGrammarPage

};
