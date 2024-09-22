interface SignupCarousalItem {
    id: number;
    image: string;
    text: string;
}

const Signup_carousal_light: SignupCarousalItem[] = [
    {
        id: 1,
        image: "/images/carousel1.jpg", // Ensure this path is correct
        text: "<b>Collaborate and Grow Together</b> <br/> Join discussion forums and collaboration tools to enhance your learning journey."
    },
    {
        id: 2,
        image: "/images/carousel2.jpg", // Example path
        text: "<i>Explore New Horizons</i> <br/> Find new opportunities and learn new skills."
    },
    {
        id: 3,
        image: "/images/carousel3.jpg", // Example path
        text: "<u>Stay Connected</u> <br/> Keep in touch with peers and mentors."
    }
];

export default Signup_carousal_light;
