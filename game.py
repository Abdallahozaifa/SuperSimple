import pygame
from pygame.locals import *

TITLE="SuperSimple"
WIDTH=1366 # window width
HEIGHT=768 # window height

FPS=60 # frames per second

WHITE = (255,255,255) # variable for color white
BLACK = (0,0,0) # variable for color black
RED = (255,0,0) # variable for color red

clock = pygame.time.Clock() # pygame clock object for frames per second

pygame.init() # initialize pygame

gameDisplay = pygame.display.set_mode((WIDTH,HEIGHT)) # window resolution
pygame.display.set_caption(TITLE) # window title

gameExit = False # game has not been triggered to exit

# start_screen() # show intro/start screen

player_x = 300 # player x position
PLAYER_Y = 300 # player y position, constant, does not change
PLAYER_POTENTIAL_VELOCITY = 10 # potential player speed
playerVelocity = 0 # current player speed

while not gameExit: # game has not been triggered to exit
	for event in pygame.event.get(): # for each user interaction with the game
		if event.type == pygame.QUIT: # exit button clicked
			gameExit = True # game is triggered to exit
		if event.type == pygame.KEYDOWN: # a key is pressed
			if event.key == pygame.K_LEFT: # left key is pressed
				playerVelocity = -PLAYER_POTENTIAL_VELOCITY # move player left at player potential velocity
			if event.key == pygame.K_RIGHT:
				playerVelocity = PLAYER_POTENTIAL_VELOCITY
		if event.type == pygame.KEYUP:
			if (event.key == pygame.K_LEFT) or (event.key == pygame.K_RIGHT): # player stops moving if key is let go
				playerVelocity = 0

	player_x += playerVelocity # move player left or right

	gameDisplay.fill(WHITE) # background will be white
	pygame.draw.rect(gameDisplay,BLACK,[player_x,PLAYER_Y,10,10]) # draw black rectangle at (400,300) (from top-left) with size (10,100) on top of background

	pygame.display.update() # draw to window

	clock.tick(FPS) # set framerate to 30 frames per second

pygame.quit() # quit pygame
quit() # quit python