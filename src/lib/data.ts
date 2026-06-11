import { agents, neighborhoods, properties } from "@/data/mock";
import type { PublicAgent, PublicNeighborhood, PublicProperty } from "@/lib/types";

export function getProperties(): PublicProperty[] {
  return properties;
}

export function getProperty(id: string): PublicProperty | undefined {
  return properties.find((p) => p.id === id);
}

export function getAgents(): PublicAgent[] {
  return agents;
}

export function getAgent(id: string): PublicAgent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentListings(agentId: string): PublicProperty[] {
  return properties.filter((p) => p.agentId === agentId);
}

export function getNeighborhoods(): PublicNeighborhood[] {
  return neighborhoods;
}

export function getNeighborhood(slug: string): PublicNeighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}
