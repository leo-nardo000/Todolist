export const id = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz123456789!#$%&/()=";

    let random_id = 0;

    for (let i = 0; i < 12; i++) {
        random_id += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
        
    }

    return random_id;
}