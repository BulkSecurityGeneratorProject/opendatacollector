package com.gerardlc.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gerardlc.domain.MigracionBarrio;
import com.gerardlc.repository.MigracionBarrioRepository;
import com.gerardlc.web.rest.util.HeaderUtil;
import com.gerardlc.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MigracionBarrio.
 */
@RestController
@RequestMapping("/api")
public class MigracionBarrioResource {

    private final Logger log = LoggerFactory.getLogger(MigracionBarrioResource.class);

    @Inject
    private MigracionBarrioRepository migracionBarrioRepository;

    /**
     * POST  /migracionBarrios -> Create a new migracionBarrio.
     */
    @RequestMapping(value = "/migracionBarrios",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MigracionBarrio> createMigracionBarrio(@Valid @RequestBody MigracionBarrio migracionBarrio) throws URISyntaxException {
        log.debug("REST request to save MigracionBarrio : {}", migracionBarrio);
        if (migracionBarrio.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("migracionBarrio", "idexists", "A new migracionBarrio cannot already have an ID")).body(null);
        }
        MigracionBarrio result = migracionBarrioRepository.save(migracionBarrio);
        return ResponseEntity.created(new URI("/api/migracionBarrios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("migracionBarrio", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /migracionBarrios -> Updates an existing migracionBarrio.
     */
    @RequestMapping(value = "/migracionBarrios",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MigracionBarrio> updateMigracionBarrio(@Valid @RequestBody MigracionBarrio migracionBarrio) throws URISyntaxException {
        log.debug("REST request to update MigracionBarrio : {}", migracionBarrio);
        if (migracionBarrio.getId() == null) {
            return createMigracionBarrio(migracionBarrio);
        }
        MigracionBarrio result = migracionBarrioRepository.save(migracionBarrio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("migracionBarrio", migracionBarrio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /migracionBarrios -> get all the migracionBarrios.
     */
    @RequestMapping(value = "/migracionBarrios",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<MigracionBarrio>> getAllMigracionBarrios(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of MigracionBarrios");
        Page<MigracionBarrio> page = migracionBarrioRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/migracionBarrios");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    /**
     * GET  /migracionBarrios -> get all the migracionBarrios.
     */
    @RequestMapping(value = "/migracionesAgrupadasBarrioDestino",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<MigracionBarrio>> getAllMigracionBarriosGrafica()
        throws URISyntaxException {
        log.debug("REST request to get a page of MigracionBarrios");
        List<MigracionBarrio> migraciones = migracionBarrioRepository.findAllMigrationsbyBarrioDes();
        //HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/migracionBarrios");
        return new ResponseEntity<>(migraciones, HttpStatus.OK);
    }



    /**
     * GET  /migracionBarrios/:id -> get the "id" migracionBarrio.
     */
    @RequestMapping(value = "/migracionBarrios/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<MigracionBarrio> getMigracionBarrio(@PathVariable Long id) {
        log.debug("REST request to get MigracionBarrio : {}", id);
        MigracionBarrio migracionBarrio = migracionBarrioRepository.findOne(id);
        return Optional.ofNullable(migracionBarrio)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /migracionBarrios/:id -> delete the "id" migracionBarrio.
     */
    @RequestMapping(value = "/migracionBarrios/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteMigracionBarrio(@PathVariable Long id) {
        log.debug("REST request to delete MigracionBarrio : {}", id);
        migracionBarrioRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("migracionBarrio", id.toString())).build();
    }
}
