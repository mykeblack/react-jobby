
const SkillModel = Mongoose.model("skill", {
    title: String,
    description: String,
    sector: SectorModel
});