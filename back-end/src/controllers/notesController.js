import Note from '../models/Note.model.js';


export const getAllNotes = async (_,res)=>{

    try{
      const notes = await Note.find().sort({createdAt:-1});
      res.status(200).json(notes)
    }catch(error){
      console.error("Error in get All notes controller",error);
      res.status(500).json({message:"Internal server error"})
    }

}

export const getSingleNote = async(req,res)=>{
     
      try{
         const singleNote = await Note.findOne({_id:req.params.id});

         if(!singleNote) return res.status(404).json({message:"Note not found!"});

         res.status(200).json(singleNote);
      }catch(error){
        console.error("Error in get a single note",error);
        res.status(500).json({message:"Internal sever error!"})
      }
}



export const createNote = async (req,res)=>{
   
    try{
         const {title,content } = req.body;
         const newNote = new Note({title,content});

         await newNote.save();

         res.status(201).json({message:"Note created successfully!"});
         
    }catch(error){
       console.error("Error in create note controller",error);
       res.status(500).json({message:"Internal server error!"})
    }
}


export const updateNote = async (req,res)=>{
    try {
        const {title, content} = req.body
         const {id} = req.params

         const updatedNote = await Note.findByIdAndUpdate(id,{title,content},{new:true});

         if(!updatedNote) return res.status(404).json(updatedNote)

        res.status(200).json({message:"Note updated successfully!"})
    } catch (error) {
        console.error("Error in update Note controller",error);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const deleteNote = async (req,res)=>{
    try {
       const deleteNote = await Note.findByIdAndDelete(req.params.id);
       
       if(!deleteNote) return res.status(404).json({message:"Note not found!"});

       res.status(200).json({message:"Not delected successfully!"});
    } catch (error) {
        console.error("Error in delete note controller",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}



















