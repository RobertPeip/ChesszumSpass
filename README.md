# ChesszumSpass
Chess for various platforms

The goal of this project was to implement a playable version of Chess with a reasonable good AI
for 3 platforms: 
 - Windows PC
 - Webbrowser
 - FPGA

This project does not have any goal to compete with existing, known chessprograms.

# FPGA

For the MiSTer platform. Copy the .rbf from the release folder of this repository to your SD-Card and start it from the OSD.

Design is done without the use of any CPU/Processor, just pure logic in VHDL.
Ressource usage is very high, as a lot of things are done in parallel:
- Finding all possible moves for a given board is done in a few clock cycles
- Executing a move(including castling and en passant) in a single cycle
- Evaluating the score of a given board for the AI costs 2 clock cycles

The design isn't super optimized and can probably be speed up quiet a bit.
However, if you experience the AI as to weak, there are better ways to improve it, than bare speed, e.g. opening tables.

# HTML5 Javascript

Clientside executed code drawing to Canvas using no external libraries.

# C# WinForms Application

Can be run on any modern Windows PC.

# Chess AI

Using pure Minimax algorithm with alpha-beta pruning and position based scoring.
Should be good enough to be a strong opponent to the occasional player even on the medium difficulty settings.