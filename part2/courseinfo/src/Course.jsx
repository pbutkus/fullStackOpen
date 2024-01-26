const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, item) => sum + item.exercises, 0);

    return (
        <h3>Number of exercises {total}</h3>
    );
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {
            parts.map((part) => <Part part={part} key={part.id} />)
        }
    </>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;