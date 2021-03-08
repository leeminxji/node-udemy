const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return [] // There is no data to load.
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.black.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)
    if (readNote) {
        console.log(chalk.blue.inverse(readNote.title))
        console.log(chalk.blue(readNote.body))
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}