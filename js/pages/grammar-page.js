// =========================================================
// ZenG English Learn
// Grammar Page
// =========================================================

import {
  AppState
} from "../app.js";


// =========================================================
// GRAMMAR TOPICS
// =========================================================

const grammarTopics = [

  {
    id: "nouns",
    number: 1,
    title: "Nouns",
    hindi: "संज्ञा",
    icon: "📦",
    description:
      "Learn about names of people, places, things and ideas."
  },

  {
    id: "pronouns",
    number: 2,
    title: "Pronouns",
    hindi: "सर्वनाम",
    icon: "👤",
    description:
      "Learn words used in place of nouns."
  },

  {
    id: "verbs",
    number: 3,
    title: "Verbs",
    hindi: "क्रिया",
    icon: "🏃",
    description:
      "Learn action words and states of being."
  },

  {
    id: "adjectives",
    number: 4,
    title: "Adjectives",
    hindi: "विशेषण",
    icon: "✨",
    description:
      "Learn words that describe people, places and things."
  },

  {
    id: "adverbs",
    number: 5,
    title: "Adverbs",
    hindi: "क्रिया विशेषण",
    icon: "⚡",
    description:
      "Learn words that describe how, when or where an action happens."
  },

  {
    id: "tenses",
    number: 6,
    title: "Tenses",
    hindi: "काल",
    icon: "⏳",
    description:
      "Learn Present, Past and Future tense."
  },

  {
    id: "prepositions",
    number: 7,
    title: "Prepositions",
    hindi: "संबंधबोधक",
    icon: "📍",
    description:
      "Learn words such as in, on, at, under and between."
  },

  {
    id: "conjunctions",
    number: 8,
    title: "Conjunctions",
    hindi: "समुच्चयबोधक",
    icon: "🔗",
    description:
      "Learn words that connect words, phrases and sentences."
  },

  {
    id: "articles",
    number: 9,
    title: "Articles",
    hindi: "A, An, The",
    icon: "🔤",
    description:
      "Learn how to correctly use A, An and The."
  },

  {
    id: "sentence-structure",
    number: 10,
    title: "Basic Sentence Structure",
    hindi: "मूल वाक्य संरचना",
    icon: "🧩",
    description:
      "Learn how to build clear and correct English sentences."
  }

];


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


// =========================================================
// RENDER GRAMMAR PAGE
// =========================================================

function renderGrammarPage(
  container,
  options = {}
) {

  if (!container) {
    return;
  }


  const displayName =
    options.displayName ||
    AppState.profile?.displayName ||
    "Learner";


  container.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:18px 16px 32px;
        "
      >

        <div
          style="
            width:min(100%,700px);
            margin:0 auto;
          "
        >

          <!-- =========================================
               TOP BAR
               ========================================= -->

          <div
            style="
              display:flex;
              align-items:center;
              gap:12px;
              margin-bottom:20px;
            "
          >

            <button
              id="grammarBackButton"
              type="button"
              aria-label="Back to dashboard"
              style="
                width:42px;
                height:42px;
                border:none;
                border-radius:50%;
                background:var(--surface-soft);
                color:var(--text);
                font-size:20px;
                cursor:pointer;
                flex-shrink:0;
              "
            >
              ←
            </button>


            <div>

              <div
                style="
                  font-size:12px;
                  color:var(--text-secondary);
                "
              >
                Hello,
                ${escapeHTML(displayName)}
              </div>

              <div
                style="
                  margin-top:2px;
                  font-size:23px;
                  font-weight:800;
                  color:var(--primary);
                "
              >
                Grammar 📚
              </div>

            </div>

          </div>


          <!-- =========================================
               INTRO CARD
               ========================================= -->

          <div
            class="card"
            style="
              padding:20px;
              margin-bottom:20px;
            "
          >

            <div
              style="
                font-size:34px;
              "
            >
              📝
            </div>

            <div
              style="
                margin-top:8px;
                font-size:19px;
                font-weight:800;
              "
            >
              Learn English Grammar
            </div>

            <div
              style="
                margin-top:6px;
                color:var(--text-secondary);
                font-size:12px;
                line-height:1.55;
              "
            >
              Complete these 10 basic grammar topics
              step by step and improve your English.
            </div>

          </div>


          <!-- =========================================
               TOPIC LIST
               ========================================= -->

          <div
            style="
              font-size:17px;
              font-weight:800;
              margin-bottom:12px;
            "
          >
            10 Basic Grammar Topics
          </div>


          <div
            id="grammarTopicList"
            style="
              display:flex;
              flex-direction:column;
              gap:10px;
            "
          >

            ${grammarTopics.map(
              (topic) => `

                <button
                  type="button"
                  class="card grammar-topic-card"
                  data-grammar-topic="${escapeHTML(topic.id)}"
                  style="
                    width:100%;
                    border:none;
                    padding:16px;
                    text-align:left;
                    cursor:pointer;
                    display:flex;
                    align-items:center;
                    gap:14px;
                  "
                >

                  <div
                    style="
                      width:44px;
                      height:44px;
                      border-radius:14px;
                      background:var(--surface-soft);
                      display:flex;
                      align-items:center;
                      justify-content:center;
                      font-size:23px;
                      flex-shrink:0;
                    "
                  >
                    ${topic.icon}
                  </div>


                  <div
                    style="
                      flex:1;
                      min-width:0;
                    "
                  >

                    <div
                      style="
                        font-size:15px;
                        font-weight:800;
                        color:var(--text);
                      "
                    >
                      ${topic.number}.
                      ${escapeHTML(topic.title)}
                    </div>

                    <div
                      style="
                        margin-top:2px;
                        font-size:11px;
                        color:var(--primary);
                        font-weight:700;
                      "
                    >
                      ${escapeHTML(topic.hindi)}
                    </div>

                    <div
                      style="
                        margin-top:5px;
                        font-size:11px;
                        line-height:1.4;
                        color:var(--text-secondary);
                      "
                    >
                      ${escapeHTML(topic.description)}
                    </div>

                  </div>


                  <div
                    style="
                      color:var(--text-secondary);
                      font-size:20px;
                      flex-shrink:0;
                    "
                  >
                    ›
                  </div>

                </button>

              `
            ).join("")}

          </div>


          <!-- =========================================
               FOOTER
               ========================================= -->

          <div
            style="
              margin-top:24px;
              text-align:center;
              color:var(--text-muted);
              font-size:11px;
            "
          >
            Powered by opnora.com
          </div>

        </div>

      </div>

    </div>

  `;


  // =======================================================
  // BACK BUTTON
  // =======================================================

  const backButton =
    container.querySelector(
      "#grammarBackButton"
    );


  backButton?.addEventListener(
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


  // =======================================================
  // TOPIC BUTTONS
  // =======================================================

  const topicButtons =
    container.querySelectorAll(
      "[data-grammar-topic]"
    );


  topicButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const topicId =
            button.dataset.grammarTopic;


          const topic =
            grammarTopics.find(
              (item) =>
                item.id === topicId
            );


          if (!topic) {
            return;
          }


          console.log(
            "ZenG Grammar topic selected:",
            topic
          );


          window.dispatchEvent(
            new CustomEvent(
              "zeng:grammar-topic",
              {
                detail: {
                  topic
                }
              }
            )
          );

        }
      );

    }
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  grammarTopics,

  renderGrammarPage

};
