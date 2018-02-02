import { applyFontSizes } from './applyFontSizes.js';

// The colors of the corresponding sentiment scores are set during the JSON stream
const data = oboe('data/topics.json')
  .node('topics.*', t => {
    t.sentimentScore > 60 ? t.color = 'seagreen' :
    t.sentimentScore < 40 ? t.color = 'firebrick':
                            t.color = 'gainsboro';
  })
  .done(obj => {
    // Upon JSON stream completion the data is visualized with an instance of Vue
    var vm = new Vue({
      el: '#cloud',
      data: {
        topics: obj.topics,
        metadata: '',
        sentiment: '',
      },
      beforeCreate: () => applyFontSizes(obj.topics),
      methods: {
        displayMetadata(e) {
          this.metadata = this.topics.filter(t => t.label == e.target.innerText)[0]
          this.sentiment = this.metadata.sentiment
        },
        // On button click the topics get sorted randomly and the view gets adjusted
        sortWords() {
          this.topics = obj.topics.map((t) => [Math.random(),t])
          .sort((a,b) => a[0]-b[0]).map((t) => t[1])
        }
      }
    });
    vm.sortWords();
  });
