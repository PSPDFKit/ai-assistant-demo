import os

from crewai import Agent, Crew, Task


api_key = os.getenv("NUTRIENT_API_KEY", "nutr_sk_placeholder")


document_operator = Agent(
    role="Document Operations Specialist",
    goal="Plan robust document processing runs for AI assistant workflows.",
    backstory="You specialize in OCR, extraction, and redaction pipelines."
)

qa_reviewer = Agent(
    role="Quality Reviewer",
    goal="Validate that document output requirements are met.",
    backstory="You catch processing and compliance gaps before release."
)

plan_task = Task(
    description=(
        "Given api key availability, plan an OCR + redact pipeline "
        "for incoming onboarding forms."
    ),
    expected_output="Step-by-step processing plan with checkpoints.",
    agent=document_operator
)

review_task = Task(
    description="Review the pipeline plan and list risks and mitigations.",
    expected_output="Risk checklist with remediation actions.",
    agent=qa_reviewer
)

crew = Crew(
    agents=[document_operator, qa_reviewer],
    tasks=[plan_task, review_task],
    verbose=True
)


if __name__ == "__main__":
    print(f"NUTRIENT_API_KEY configured: {api_key != 'nutr_sk_placeholder'}")
    print(crew.kickoff())
