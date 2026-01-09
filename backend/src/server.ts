import createApp from './app';

const PORT = process.env.PORT || 3000; // Use dynamic port if available
const app = createApp();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
