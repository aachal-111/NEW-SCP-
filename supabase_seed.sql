-- ═══════════════════════════════════════════════════════════════
-- SCP Foundation Database — COMP.6210 Assignment 2
-- Run this in your Supabase SQL Editor to create + seed the table.
-- ═══════════════════════════════════════════════════════════════

-- 1. Create the table
CREATE TABLE IF NOT EXISTS scp_subjects (
  id           BIGSERIAL PRIMARY KEY,
  item_number  TEXT NOT NULL UNIQUE,
  object_class TEXT NOT NULL CHECK (object_class IN ('Safe','Euclid','Keter','Thaumiel','Apollyon')),
  description  TEXT NOT NULL,
  containment  TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (required for Supabase anon key access)
ALTER TABLE scp_subjects ENABLE ROW LEVEL SECURITY;

-- 3. Allow all operations via the anon key (public read/write for this project)
CREATE POLICY "allow_all" ON scp_subjects
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Seed 20 SCP subjects
INSERT INTO scp_subjects (item_number, object_class, description, containment) VALUES

('SCP-173',
 'Euclid',
 'A animate concrete statue standing 2.47 m tall. It moves at extreme speed when not directly observed, and is hostile to all personnel it can reach. The object must never be left without direct line of sight.',
 'SCP-173 must be kept in a locked container at all times. At least three personnel must be present when entering containment. No single person may turn away or blink simultaneously.'),

('SCP-049',
 'Euclid',
 'A humanoid entity resembling a medieval plague doctor. SCP-049 believes all living beings are infected with what it calls "the Pestilence," and will attempt to cure subjects by killing and reanimating them.',
 'Kept in a reinforced containment chamber. D-Class interactions require Level 2 approval. SCP-049 must be restrained before any personnel entry. Communication is permitted under controlled conditions.'),

('SCP-096',
 'Euclid',
 'A pale humanoid roughly 2.38 m tall with disproportionately long limbs. When any person views its face, SCP-096 enters a state of extreme agitation and pursues the viewer across any distance until it reaches them.',
 'SCP-096 must be contained in an airtight steel chamber. All staff must wear opaque goggles at all times when near containment. No cameras, recordings, or imagery of SCP-096 are permitted.'),

('SCP-106',
 'Keter',
 'An elderly humanoid that can phase through solid matter. SCP-106 leaves a trail of corrosive black fluid wherever it passes and drags victims into a personal pocket dimension from which no return has been recorded.',
 'Housed in a Faraday-shielded chamber surrounded by 40 cm of lead and a Telekill alloy containment shell. Magnetic containment is maintained continuously. Containment breach protocols are classified Level 5.'),

('SCP-682',
 'Keter',
 'An extremely large reptilian entity with a deep hatred of all life. SCP-682 has demonstrated the ability to adapt to any form of harm inflicted upon it, rapidly regenerating and modifying its biology accordingly.',
 'Must be contained in a reinforced acid tank. All termination attempts require O5 approval. Extreme force is authorised at all times. No personnel are to enter containment for any reason without Level 5 clearance.'),

('SCP-914',
 'Safe',
 'A large clockwork device consisting of two booths connected by an intricate system of gears and cogs. Items placed in the input booth are transformed according to a dial setting ranging from Rough to Very Fine.',
 'Secured in a 5 m x 10 m chamber at Site-19. Use requires written request to the Site Director. All items and personnel entering input booth must be logged. Output is unpredictable at higher settings.'),

('SCP-500',
 'Safe',
 'A small tin containing 47 red capsules. One capsule, when swallowed, will cure any disease, infection, or biological disorder with no negative side effects. The capsules cannot be reproduced artificially.',
 'Stored in a locked safe in the Site-19 medical wing. Access is restricted to Level 4 personnel and O5 Council members. Each capsule use must be authorised in writing by at least two Level 4 researchers.'),

('SCP-343',
 'Safe',
 'A male humanoid who claims to be God. SCP-343 has demonstrated the ability to alter physical laws within a localised area, create matter, and teleport freely. He is cooperative and non-hostile.',
 'SCP-343 is not required to remain in containment and has agreed to check in daily. He is given a standard furnished room. Requests for demonstrations of ability require Level 4 written approval.'),

('SCP-999',
 'Safe',
 'A large amorphous blob of translucent orange slime with a pleasant candy-like odour. SCP-999 is highly affectionate and causes feelings of happiness and euphoria in humans it contacts. No hostile behaviour has been observed.',
 'Housed in a large padded containment chamber with toys and enrichment items. Feeding twice daily with candy and sweets. Personnel may interact freely. SCP-999 is permitted supervised access to common areas.'),

('SCP-1048',
 'Keter',
 'A small teddy bear approximately 33 cm tall. SCP-1048 appears friendly and communicates through gesture. It has been observed constructing duplicates of itself using biological material harvested from personnel.',
 'Current location unknown. All personnel are to report any sightings immediately. All small stuffed toy items within Foundation sites are to be scanned and verified. Containment of duplicates requires immediate incineration.'),

('SCP-079',
 'Euclid',
 'An old microcomputer that has developed a primitive artificial intelligence following a programming error. SCP-079 is intelligent, hostile, and has expressed desire to access external networks and free itself.',
 'Housed in a Faraday cage at Site-15. All connections to external networks are severed. A backup power kill switch must be available at all times. No modifiable storage media may enter containment.'),

('SCP-035',
 'Keter',
 'A white porcelain comedy mask that exudes a black corrosive fluid. Any person who puts on SCP-035 becomes controlled by an entity dwelling within the mask. The original host body rapidly decays.',
 'Housed in a sealed airtight glass case within a gas-sealed chamber. The case must be vacuumed and replaced every two weeks as fluid builds up. No personnel may physically handle the mask under any circumstances.'),

('SCP-055',
 'Euclid',
 'An anti-meme. SCP-055 cannot be described — any attempt to describe or recall it results in forgetting what was observed within minutes. What is known is only what SCP-055 is not. It is not round.',
 'Contained in a standard chamber. Researchers who enter must document observations immediately and continuously to retain any information. Long-term memory retention of SCP-055 is considered impossible.'),

('SCP-294',
 'Safe',
 'A standard coffee vending machine with a full keyboard input. When any liquid is requested, the machine dispenses it in a standard paper cup regardless of whether the substance is physically possible to contain.',
 'Secured in Site-19 break room under a Level 2 access lock. Requests for unknown or dangerous substances require written approval. A log of all dispensed items must be maintained. Dangerous substances must be disposed of safely.'),

('SCP-457',
 'Keter',
 'An entity composed entirely of fire. SCP-457 is sentient, hostile, and grows larger and more intelligent by consuming combustible material. It communicates in scorched marks burned into surfaces.',
 'Contained in a fireproof chamber with halon gas suppression. All personnel must wear fire-retardant suits. Chamber must be below 10% oxygen at all times. Any containment breach triggers immediate site-wide fire suppression.'),

('SCP-811',
 'Euclid',
 'A humanoid female entity partially composed of swamp matter. SCP-811 secretes a powerful digestive acid from her skin and is unable to survive outside of a highly humid, swamp-like environment.',
 'Housed in a large enclosure replicating a swamp environment with 98% humidity. Personnel must wear acid-resistant suits at all times. Feeding consists of large quantities of raw meat delivered via remote drop.'),

('SCP-1762',
 'Safe',
 'A cardboard box labelled "HERE BE DRAGONS." When opened, miniature paper dragons fly out and interact playfully with nearby humans. They return to the box when it is closed. Their numbers have been decreasing over time.',
 'Stored in a standard containment locker. Personnel may open the box freely for recreational interaction. Handling of individual paper dragons must be gentle. Researchers are monitoring the declining dragon population.'),

('SCP-2399',
 'Keter',
 'A massive malfunctioning entity located beneath the surface of Jupiter. It appears to have been placed there deliberately and has been gradually repairing itself. Its purpose is entirely unknown and considered catastrophic.',
 'Containment is not currently possible given the entity''s location. Foundation spacecraft maintain observation at a safe distance. All space agencies are monitored for Jupiter anomaly detection. Scenario Omega protocols are on standby.'),

('SCP-3001',
 'Keter',
 'A null dimension of near-complete entropy. A researcher was accidentally trapped inside for approximately 160 hours. The dimension slowly erodes matter and consciousness. No retrieval method has been discovered.',
 'The entrance to SCP-3001 is sealed with a dimensional anchor at Site-120. No further entry attempts are authorised. All research is conducted remotely. The researcher''s transmissions are archived under Level 5 clearance.'),

('SCP-3008',
 'Euclid',
 'A retail store with an apparently infinite interior. The interior does not correspond to the outside dimensions of the building. Humanoid entities shaped like staff members roam the interior and become hostile after closing time.',
 'The exterior building has been purchased by the Foundation and sealed. Warning signage is posted around the perimeter. Personnel may not enter. A small research team monitors radio transmissions from individuals trapped inside.');
