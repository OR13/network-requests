import { superAgentPromise } from "./superagent";

it("renders without crashing", async () => {
  let response = await superAgentPromise();
  expect(response.body.name).toBe("Luke Skywalker");
});
