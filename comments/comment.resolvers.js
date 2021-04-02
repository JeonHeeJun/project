export default{
    Comment:{
        isMine:({userId},_,{loggedUser})=>{
            if(!loggedUser) return false;
            return (loggedUser.id === userId)},
    }
}
