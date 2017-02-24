/**
 * Inverted Index class
 */
class InvertedIndex {
    /**
     * class constructor
     */
    constructor() {
        // object to store the indices
        this.indices = {};
    }
    static normalizedText(text) {
        return text.toLowerCase().match(/[A-Za-z]+/g, (matched) => {
            console.log(matched).sort();
        });
    }

    static uniqueWords(words) {
            const tokens = InvertedIndex.normalizedText(words);
            return tokens.filter((item, index) => tokens.indexOf(item) === index);
        }
        /**
         * createIndex takes a document and builds an idex out of it
         * @param{String} fileName - The name of the file to be indexed
         * @param{Array} fileContent - The content of the file to be indexed
         * @return{Array} indices - Maps words to their location
         */
    createIndex(fileName, fileContent) {
        const indexedFile = {};
        const fileLength = fileContent.length;
        const wordsToIndex = [];
        if (fileLength === 0) {
            return 'JSON file is Empty';
        }
        fileContent.forEach((doc) => {
            if (doc.text) {
                wordsToIndex.push(`${doc.title} ${doc.text}`.toLowerCase());
            }
        });
        const uniqueContent = InvertedIndex.uniqueWords(wordsToIndex.join(' '));
        uniqueContent.forEach((word) => {
            indexedFile[word] = [];
            wordsToIndex.forEach((doc, index) => {
                if (doc.indexOf(word) > -1) {
                    indexedFile[word].push(index);
                }
            });
        });
        this.indices[fileName] = indexedFile;
    }
    getIndex(fileName) {
        return this.indices[fileName];
    }
    searchIndex(query, indexToSearch) {
        let searchResult = {};
        let searchTerms = InvertedIndex.uniqueWords(query);
        searchTerms.forEach((word) => {
            if (indexToSearch) {
                if (this.indices[indexToSearch][word]) {
                    searchResult[word] = this.indices[indexToSearch][word];
                } else {
                    searchResult[word] = 'We are Sorry but' + `${word}` + 'is not found in our database';
                }
            } else {
                Object.keys(this.indices).forEach((key) => {
                    if (this.indices[key][word]) {
                        searchResult[word] = this.indices[key][word];
                    } else {
                        searchResult[word] = 'We are Sorry but' + `${word}` + 'is not found in our database';
                    }
                });
            }
        });
        return searchResult;
    }
}
module.exports = InvertedIndex;