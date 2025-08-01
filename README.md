# BetterSayAction
Script for the input section of aidungeon. Improves and fixes the actions of **say**, **do** and **story**.

# Fixes
Fix for first person from **'I says'** to **'I say'** (third person with character name set to I.)
Improves the quoted text from:
- From: **example text "example"**
- Into: **example text, "Example."**

# SAY and DO action (do written with quoted text inside)
Does the same improvement but if it detects a say in the input it dynamically chooses the verb to use:
- If it ends with a special symbold like **?** it tries to change the verb accordingly (See last point).
- If it find a period or a symbol like **!** different from the one at the end of the quoted text it defaults to **say**.
- If the quoted text ends in a mix of **?** and **!** like for example **!!?** it replaces the verb to **exclaim**
- If **50%** of the text is uppercase and it ends in **!** Then it uses **scream**

If none of the edge cases trigger proceds to selecting the verb:
- Text ends with period it uses either **say**(70%) or **state**
- Text ends with **?** it uses either **ask**(70%) or **inquire**
- Text ends with **!** it uses **shout**

  
