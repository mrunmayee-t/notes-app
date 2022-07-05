const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNoteSingular = notes.find(note => note.title === title) //to find one duplicate and stop this will not parse through whole array
    if(!duplicateNoteSingular){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNotes = (title) => {
    const notesToRemove = loadNotes();
    const notesToKeep = notesToRemove.filter(note=>note.title !== title);
    if(notesToRemove.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note Removed!"));
        saveNotes(notesToKeep);
    }
    else{
        console.log(chalk.red.inverse("No note found!"));
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON); 
}

const loadNotes = () => {
    try{
        const dataJSON = fs.readFileSync('notes.json').toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes'));
    const notes = loadNotes();
    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find(note => note.title === title);
    if(findNote){
        console.log('Title: '+ chalk.green.inverse(findNote.title));
        console.log('Body: ' + findNote.body);
    }
    else{
        console.log(chalk.red.inverse('No Note found!'));
    }
}
module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
};