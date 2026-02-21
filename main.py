import pygame
import time

# --- INITIALIZATION ---
pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Adaptive Escape Room")
clock = pygame.time.Clock()

# Colors 
BLACK = (10, 10, 15)
WHITE = (240, 240, 240)
CYAN = (0, 200, 255)
RED = (255, 50, 50)
GOLD = (255, 215, 0)

# --- THE ADAPTIVE DIRECTOR ---
class Director:
    def __init__(self):
        self.last_move_time = time.time()
        self.pressure_level = 0

    def watch(self, is_moving, screen):
        current_time = time.time()
        
        # 1. Hesitation Logic
        if is_moving:
            self.last_move_time = current_time
            self.pressure_level = 0
        
        idle_time = current_time - self.last_move_time
        
        # 2. Adaptation (Visual Pressure)
        if idle_time > 3:
            # Draw a creepy red border that gets thicker the longer you wait
            self.pressure_level = min(300, (idle_time - 3) * 15)
            pygame.draw.rect(screen, RED, (0, 0, WIDTH, HEIGHT), int(self.pressure_level))

# --- GAME SETUP ---
player_pos = [50, 50]
player_size = 20
player_speed = 5

# A simple starting maze
walls = [
    pygame.Rect(0, 0, 800, 20),      # Top
    pygame.Rect(0, 0, 20, 600),      # Left
    pygame.Rect(0, 580, 800, 20),    # Bottom
    pygame.Rect(780, 0, 20, 600),    # Right
    pygame.Rect(150, 0, 20, 400),    # Inner Wall 1
    pygame.Rect(150, 400, 200, 20),  # Inner Wall 2
    pygame.Rect(350, 200, 20, 400),  # Inner Wall 3
    pygame.Rect(500, 0, 20, 450),    # Inner Wall 4
]

goal = pygame.Rect(700, 50, 50, 50)
director = Director()
game_won = False

# --- MAIN GAME LOOP ---
running = True
while running:
    # 1. Handle Events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. Player Movement
    keys = pygame.key.get_pressed()
    dx, dy = 0, 0
    is_moving = False

    if not game_won:
        if keys[pygame.K_w] or keys[pygame.K_UP]: dy -= player_speed
        if keys[pygame.K_s] or keys[pygame.K_DOWN]: dy += player_speed
        if keys[pygame.K_a] or keys[pygame.K_LEFT]: dx -= player_speed
        if keys[pygame.K_d] or keys[pygame.K_RIGHT]: dx += player_speed

    if dx != 0 or dy != 0:
        is_moving = True

    # 3. Collision Detection
    new_x_rect = pygame.Rect(player_pos[0] + dx, player_pos[1], player_size, player_size)
    new_y_rect = pygame.Rect(player_pos[0], player_pos[1] + dy, player_size, player_size)
    
    collide_x = any(new_x_rect.colliderect(wall) for wall in walls)
    collide_y = any(new_y_rect.colliderect(wall) for wall in walls)

    if not collide_x: player_pos[0] += dx
    if not collide_y: player_pos[1] += dy

    # Check Win Condition
    player_rect = pygame.Rect(player_pos[0], player_pos[1], player_size, player_size)
    if player_rect.colliderect(goal):
        game_won = True

    # --- DRAWING ---
    if game_won:
        screen.fill(GOLD) # Paint the whole screen gold when you win!
    else:
        screen.fill(BLACK) 
        
        # Draw Walls
        for wall in walls:
            pygame.draw.rect(screen, CYAN, wall)
        
        # Draw Goal
        pygame.draw.rect(screen, GOLD, goal)

        # Draw Player
        pygame.draw.rect(screen, WHITE, player_rect)

        # Let the Director watch and modify the screen
        director.watch(is_moving, screen)

    # Update Display
    pygame.display.flip()
    clock.tick(60) 

pygame.quit()