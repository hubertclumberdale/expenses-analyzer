"use client";
import Link from "next/link";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Page = () => {
  const sections = [
    {
      title: "Participants",
      link: "/participants",
    },
    {
      title: "Households",
      link: "/households",
    },
    {
      title: "Expenses",
      link: "/expenses",
    },
  ];

  return (
    <>
      <Container>
        <h1>Expenses Analyzer</h1>
        <Row>
          {sections.map((section, index) => {
            return (
              <Col className="my-4" key={index} xs={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>{section.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Link href={section.link}>
                      <Button>Explore {section.title}</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Page;
