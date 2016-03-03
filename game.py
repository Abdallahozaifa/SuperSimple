import pygame
from pygame.locals import *

from random import randint
import math

TITLE = "SuperSimple"
WIDTH = 1366
HEIGHT = 768

FPS = 60

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

clock = pygame.time.Clock() # pygame clock object for frames per second

class Player:
	'''
	Player controls this block that can move left or right.  Must dodge blocks too big for it and should 
	touch blocks that are smaller than it.  If player touches block smaller than it, it absorbs that block's size.
	
	Attributes:
	POTENTIAL_VELOCITY: speed that player can move left and right, (constant for now, may depend on player's size)
	Y: y position of player (constant)

	size: size of block, is an integer squared

	velocity: direction that player is moving, 0 if not moving
	color: color of player block.  changes to color of last touched block
	x: x position of player	
	'''

	POTENTIAL_VELOCITY = 15
	Y = 500

	size = 50

	def __init__(self, color, x):
		self.velocity = 0
		self.color = color
		self.x = x
		self.updateRect()

	def setPositionX(self, x):
		self.x = x
		self.updateRect()

	def setSize(self, size):
		self.size = size
		self.setPositionX(self.x - (float(self.size) / 2)) # should center block when it gets bigger
		self.updateRect()

	def updateRect(self):
		self.rect = Rect(self.x, Player.Y, self.size, self.size)

class Enemy:
	'''
	Falling blocks of different sizes that fall at different speeds.
	Speed depends on size.

	Attributes:
	size: size of block, is an integer squared, depends on current player size
	velocity: speed that block falls, depends on size
	color: color of this block, random
	x: x position that block falls at
	y: y position that block starts falling at, same initial value for each enemy block
	'''

	def __init__(self, color, size, velocity, x):
		self.color = color
		self.size = size
		self.velocity = velocity
		self.x = x
		self.y = 0 - size
		self.updateRect()

	def setPositionY(self, y):
		self.y = y
		self.updateRect()

	def setSize(self, size):
		self.size = size
		self.updateRect()

	def updateRect(self):
		self.rect = Rect(self.x, self.y, self.size, self.size)

gameExit = False
gameStart = False
gameOver = False

player = Player(BLACK, (WIDTH / 2) - (Player.size / 2)) # initialize player object

enemies = [] # initialize empty enemies array
enemyVelocityMultiplier = 1 # enemy speed multiplier
level = 1

scaling = False # whether or not we need to zoom everything

pygame.init()

gameDisplay = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption(TITLE)

while not gameExit:
	for event in pygame.event.get():
		if event.type == pygame.QUIT: # exit button clicked
			gameExit = True

		# start_screen logic NEEDS TO BE MOVED OUT OF THIS IF STATEMENT
		
		if event.type == pygame.KEYDOWN:
			if event.key == pygame.K_LEFT:
				player.velocity = -Player.POTENTIAL_VELOCITY
			elif event.key == pygame.K_RIGHT:
				player.velocity = Player.POTENTIAL_VELOCITY

		if event.type == pygame.KEYUP:
			if (event.key == pygame.K_LEFT) or (event.key == pygame.K_RIGHT): # player stops moving if movement key is let go
				player.velocity = 0

	if (player.x < 0) or ((player.x == Player.POTENTIAL_VELOCITY) and (player.velocity < 0)) or ((player.x == 0) and (player.velocity < 0)): # define player boundaries, if player passes or tries to pass boundaries, set position to right in front of boundary and set velocity to 0
		player.setPositionX(0)
		player.velocity = 0
	elif (player.x > WIDTH - player.size) or ((player.x == WIDTH - Player.POTENTIAL_VELOCITY - player.size) and (player.velocity > 0)) or ((player.x == WIDTH - player.size) and (player.velocity > 0)):
		player.setPositionX(WIDTH - player.size)
		player.velocity = 0

	player.setPositionX(player.x + player.velocity) # move player left or right

	if player.size >= (WIDTH / 10): # if player is 1/10th of the screen:  make all objects 10x smaller and increase velocity
		scaling = True
		player.setSize(player.size / 2)
		enemyVelocityMultiplier *= 2 # change future enemies velocity multiplier
		level += 1

	gameDisplay.fill(WHITE) # fill background to be white
	pygame.draw.rect(gameDisplay, player.color, [player.x, Player.Y, player.size, player.size]) # draw black rectangle at (player_x,player_y) (from top-left) with size (playerSize,playerSize) (also from top-left) on top of background

	# TURN THIS IF INTO FUNCTION
	if randint(1, 5) == 5: # 1 in 5 chance of spawning an enemy (60 times a second)
		percent = (float(randint(80, 120)) / 100) # enemy blocks will be at maximum 20% bigger or smaller than player

		enemySize = player.size * percent

		enemies.append(Enemy((randint(0, 255), randint(0, 255), randint(0, 255)), enemySize, enemyVelocityMultiplier * randint(1, 5), randint(0, WIDTH - math.ceil(enemySize))))

	for enemy in enemies: # update existing enemies
		if scaling:
			enemy.setSize(enemy.size / 2)
			enemy.velocity *= 2 # change existing enemies velocity

		enemyDead = False

		enemy.setPositionY(enemy.y + enemy.velocity)

		# for enemyTwo in enemies:
		# 	if enemy.rect.colliderect(enemyTwo.rect) and not (enemy is enemyTwo):
		# 		enemyDead = True # currently deleting current enemy, maybe compare sizes and delete smaller enemy of the two instead?
		
		if enemy.rect.colliderect(player.rect):
			if player.size > enemy.size and not gameOver: # REMOVE !gameOver
				player.setSize(player.size + enemy.size)
				enemyDead = True
			elif enemy.size > player.size:
				player.color = RED
				gameOver = True

		if enemy.y >= HEIGHT: # remove enemy from array and make object null if it gets to bottom of screen
			enemyDead = True

		if enemyDead:
			enemies.remove(enemy)
			enemy = None
		else:
			pygame.draw.rect(gameDisplay, enemy.color, [enemy.x, enemy.y, enemy.size, enemy.size])

	if scaling:
		scaling = False

	pygame.display.update()

	clock.tick(FPS) # set framerate to 60 frames per second

pygame.quit()
quit()