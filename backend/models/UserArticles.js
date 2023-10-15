const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Article = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        maxLength: 50,
    },
    description: {
        required: true,
        type: String,
    },
    markdown: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    sanitizedHtml: {
        required: true,
        type: String,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    Like: {
        type: Number,
        default: 0,
    },
    Comment: [
        {
            username: {
                type: String,
                default: null,
            },
            comment: {
                type: String,
                default: null,
            },
        }
    ]
    
})

Article.pre('validate', function (next) {
    if (this.author || this.isModified('title')) {
        console.log(this.title);
        this.slug = slugify(this.title);
    }
    if (this.isModified('markdown') || this.markdown) {
        this.sanitizedHtml = DOMPurify.sanitize(marked.parse(this.markdown));
    }
    next();
})

module.exports = mongoose.model('Article', Article);