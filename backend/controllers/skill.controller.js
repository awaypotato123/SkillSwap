import Skill from "../models/Skill.js";
import User from "../models/User.js";


export const getAllSkills = async (req, res) => {
    try {
        const {keyword, category} = req.query; 

        let query = {};

        if(keyword) {
            query.title = { $regex: keyword, $options: "i"}; 
        }

        if(category) {
            query.category = category;
        }
        
        const skills = await Skill.find(query).populate("userId", "firstName lastName email"); 
        res.status(200).json(skills);
    }
    catch(err) {
        console.error("Error fetching skills", err);
        res.status(500).json({ message: "Server error fetching skills"});
    }
}

export const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate("userId", "firstName lastName email");
        if(!skill) return res.status(404).json({message: "Skill not found"});
        res.status(200).json(skill);
    }
    catch (err) {
        console.error("Error fetching skill by Id:", err);
        res.status(500).json({ message: "Server error fetching skill"});
    }
}

export const createSkill = async (req, res) => {
    try {
        const { title, description, category, level } = req.body;  
        const userId = req.user?.id;

        if (!userId)
            return res.status(401).json({message: "Unauthorized - user not logged in"});

        const skill = new Skill({
            title,
            description,
            category,
            level,
            userId
        });

        const savedSkill = await skill.save();

        await User.findByIdAndUpdate(userId, { $push: {skills: savedSkill._id} });

        res.status(201).json({
            message: "Skill created successfully",
            skill: savedSkill,
        });
    }
    catch (err) {
        console.error("Error creating skill: ", err);
        res.status(500).json({ message: "Server error creating skill" });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - user not logged in" });
        }

        // Find the skill
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        // Check if the user owns this skill
        if (skill.userId.toString() !== userId) {
            return res.status(403).json({ message: "You can only delete your own skills" });
        }

        // Delete the skill
        await Skill.findByIdAndDelete(skillId);

        
        await User.findByIdAndUpdate(userId, { $pull: { skills: skillId } });

        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (err) {
        console.error("Error deleting skill:", err);
        res.status(500).json({ message: "Server error deleting skill" });
    }
};