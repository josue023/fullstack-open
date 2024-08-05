const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((total, part) => total + part.exercises, 0);
  return <p>total of {total} exercises</p>;
};

export default Course;
