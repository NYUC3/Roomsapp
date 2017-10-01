# Rooms Backend

Made for AWS Lambda via Serverless framework.

# Dev

Clone and npm install.
Set up a DynamoDD local instance.
Actual documentation to follow.

## Schemas:

User:

- ID
- Email
- Access
- Reservations

Location:

- Name
- ID
	- First four letters of first word in name + last letter (or more semantically appropriate, ie. Steinhardt Music => STEIM). This becomes Sm as shortcode on frontend
- Address
- Amenities
